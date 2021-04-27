module Api
  module V1
    class VotesController < ApplicationController
      before_action :authenticate_user_using_x_auth_token, only: :create
      
      def create
        @vote = Vote.new(vote_params)
        voted = Vote.where(poll_id: vote_params[:poll_id],
          user_id: @current_user.id
        )
        if(voted.length > 0)
          render status: :unprocessable_entity, json: {
          errors: t('vote.duplicate_error_message')
          }
        elsif @vote.save
          render status: :ok, json: { notice: t('vote.success_message') }
        else
          errors = @vote.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors }
        end
      end

      private

      def vote_params
        params.require(:vote).permit(:poll_id, :option_id)
          .merge(user_id: @current_user.id)
      end
    end
  end
end